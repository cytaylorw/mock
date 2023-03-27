const { faker } = require('@faker-js/faker');

const departmentList = [
    ['04510', '安控一科'],
    ['05400', '客服部'],
    ['05110', '商品一科'],
    ['03320', '會計二科'],
    ['06100', '通路服務部'],
    ['06130', '設備維護科'],
    ['04620', '資服二科'],
]

module.exports = {
    memberInfo: {
        db: 'mssql',
        table: 'EZC_MEMBER_BASIC_INFO',
        columns: {
            LOGIN_ID: {
                type: 'varchar',
            },
            MEMBER_NAME: {
                type: 'nvarchar',
            },
            MEMBER_ID: {
                type: 'varchar',
            },
            EMAIL: {
                type: 'varchar',
            },
            IS_ACTIVE: {
                type: 'varchar',
            },
            DEP_NAME: {
                type: 'nvarchar',
            },
            DEP_ID: {
                type: 'varchar',
            },
            IS_MANAGER: {
                type: 'varchar',
            },
        },
        mock: () => {
            faker.locale = 'zh_TW'
            const name = faker.name.lastName() + faker.name.firstName()
            faker.locale = 'en'
            const fname = faker.name.firstName()
            const username = faker.unique(faker.internet.userName, [fname], {store: 'EZC_MEMBER_BASIC_INFO_NAME'}).toLowerCase()
            const [depId, depName] = faker.helpers.arrayElement(departmentList)

            return {
                LOGIN_ID: username,
                MEMBER_NAME: name,
                MEMBER_ID: faker.unique(faker.helpers.replaceSymbolWithNumber, ['###'], {store: 'EZC_MEMBER_BASIC_INFO_MEMBER_ID'}),
                EMAIL: faker.unique(faker.internet.email, [username, undefined,'easycard.com.tw'], {store: 'EZC_MEMBER_BASIC_INFO_EMAIL'}),
                IS_ACTIVE: faker.helpers.arrayElement(['Y','N']),
                DEP_NAME:depName,
                DEP_ID: depId,
                IS_MANAGER: faker.helpers.arrayElement(['Y','N']),
            }
        },
    },
    parties: {
        db: 'oracle',
        table: 'APPS.HZ_PARTIES',
        count: 100,
        columns: {
            PARTY_ID: {
                type: 'varchar',
            },
            PARTY_NAME: {
                type: 'nvarchar',
            },
            KNOWN_AS: {
                type: 'nvarchar',
            },
            ADDRESS1: {
                type: 'nvarchar',
            },
            PARTY_NUMBER: {
                type: 'varchar',
            },
        },
        mock: () => {
            faker.locale = 'zh_TW'
            const known = faker.company.companyName()
            const name = known.replace(/\s/g,'')
            const address = faker.address.streetAddress()
            faker.locale = 'en'

            return {
                PARTY_ID: faker.unique(faker.datatype.number, [], {store: {'APPS.HZ_PARTIES_PARTY_ID':{}}}),
                PARTY_NAME: name,
                KNOWN_AS:known,
                ADDRESS1: address,
                PARTY_NUMBER: faker.unique(faker.helpers.replaceSymbolWithNumber, ['####'], {store: {'APPS.HZ_PARTIES_PARTY_NUMBER': {}}}),
            }
        },
    },
    customers: {
        db: 'oracle',
        table: 'APPS.HZ_CUST_ACCOUNT',
        count: 20,
        columns: {
            PARTY_ID: {
                type: 'varchar',
            },
            ACCOUNT_NUMBER: {
                type: 'varchar',
            },
            ATTRIBUTE14: {
                type: 'varchar',
            },
        },
        arrayFrom: [
            ['parties', 'PARTY_ID'],
        ],
        mock: (partyIdList) => {
            return {
                PARTY_ID: faker.unique(faker.helpers.arrayElement, [partyIdList], {store: {'APPS.HZ_CUST_ACCOUNT_PARTY_ID': {}}}),
                ACCOUNT_NUMBER: faker.unique(faker.helpers.replaceSymbolWithNumber, ['####'], {store: {'APPS.HZ_CUST_ACCOUNT_ACCOUNT_NUMBER': {}}}),
                ATTRIBUTE14: faker.unique(faker.helpers.replaceSymbolWithNumber, ['########'], {store: {'APPS.HZ_CUST_ACCOUNT_ATTRIBUTE14': {}}}),
            }
        },
    },
}