import threatstack
import argparse
import datetime
import time
import boto3
import sys
import configparser
from pathlib import Path


def get_alerts(orgid, userid, apikey, watchrule):
    dstips = set()
    srcips = []

    client = threatstack.ApiClient(user_id=userid, org_id=orgid, api_key=apikey, retry=500)

    start_date = str(datetime.datetime.today().date() - datetime.timedelta(2))
    end_date = str(datetime.datetime.today().date() + datetime.timedelta(2))

    alert_list = client.get_list('alerts?status=active&from=' + start_date + '&until=' + end_date)

    while alert_list:
        for alert in alert_list.data:
            if alert['ruleId'] != watchrule:
                continue

            event_list = client.get_list('alerts/' + alert['id'] + '/events')

            for event in event_list.data:
                if 'connection' in event:
                    dstips.add(event['connection']['dst_addr'] + '/32')

                    agent_data = client.get_one('agents/' + event['agent_id'])

                    for privateaddr in agent_data.data['ipAddresses']['private']:
                        if 'container_id' in event:
                            container = event['container_id']
                        else:
                            container = 'Host'

                        addrdict = {'container': container, 'address': privateaddr}

                        if addrdict not in srcips:
                            srcips.append(addrdict)

        if alert_list.token:
            querystring = 'alerts?status=active&token=' + alert_list.token
            alert_list = client.get_list(querystring)
        else:
            alert_list = None

    return dstips, srcips


def clear_aws_acls(aclid):
    ec2 = boto3.client('ec2')

    response = ec2.describe_network_acls(DryRun=False, NetworkAclIds=[aclid])

    for networkacl in response['NetworkAcls']:
        for entry in networkacl['Entries']:
            if entry['Egress'] is True and entry['RuleNumber'] < 32766:
                ec2.delete_network_acl_entry(DryRun=False, Egress=True,
                                             NetworkAclId=aclid, RuleNumber=entry['RuleNumber'])
                print("Deleted entry", entry)


def update_aws_acl(aclid, address):
    ec2 = boto3.client('ec2')

    rule_number = 0
    response = ec2.describe_network_acls(DryRun=False, NetworkAclIds=[aclid])

    for networkacl in response['NetworkAcls']:
        for entry in networkacl['Entries']:
            if entry['CidrBlock'] == address:
                print("Found address", address, "in entry", entry, ", skipping")
                return
            else:
                rule_number += 1

    response = ec2.create_network_acl_entry(CidrBlock=address,
                                            DryRun=False,
                                            Egress=True,
                                            RuleAction='deny',
                                            Protocol='-1',
                                            NetworkAclId=aclid,
                                            RuleNumber=rule_number)

    print("Blocked", address, "for ID", aclid, "response", response['ResponseMetadata']['HTTPStatusCode'])


def main():
    config = configparser.ConfigParser()
    config.read(str(Path.home()) + '/.threatstack/credentials')

    if 'default' not in config:
        print("No default section in TS credentials")
        sys.exit()

    if 'ts_org' not in config['default']:
        print("No org in TS credentials")
        sys.exit()

    if 'ts_user' not in config['default']:
        print("No user in TS credentials")
        sys.exit()

    if 'ts_key' not in config['default']:
        print("No key in TS credentials")
        sys.exit()

    parser = argparse.ArgumentParser()
    parser.add_argument("--watchrule", help="TS Rule to watch")
    parser.add_argument("--aws_acl_id", help="AWS acl ID")
    parser.add_argument('--cleanup', default=False, action='store_true')
    parser.add_argument('--alerts', default=False, action='store_true')

    args = parser.parse_args()

    if args.cleanup:
        clear_aws_acls(args.aws_key)
        print("Cleanup completed")
    elif args.alerts:
        dstips, srcips = get_alerts(args.org, args.user, args.key, args.watchrule)
        print("Alerts returned IPs destination", dstips, "source", srcips)
    else:
        while True:
            dstips, srcips = get_alerts(config['default']['ts_org'], config['default']['ts_user'],
                                        config['default']['ts_key'], args.watchrule)

            print("Alert poll returned destination", dstips, "source", srcips, "to block at the firewall")

            for ip in dstips:
                update_aws_acl(args.aws_acl_id, ip)

            time.sleep(10)


if __name__ == "__main__":
    main()
