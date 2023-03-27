const convertToColumnsAndValues = data => {
    const values = Object.entries(data.data).map(([name, value]) => {
        let result = value;
        switch (data.columns?.[name]?.type?.toLocaleLowerCase()) {
            case 'varchar':
            case 'nvarchar':
                result = `'${value}'`
                break;
            default:
                break;
        }
        return result
    })

    return [Object.keys(data.data), values]
}


module.exports.insert = data => {
    const [columns, values] = convertToColumnsAndValues(data)
    return `INSERT INTO ${data.table} (${columns.join(',')}) VALUES (${values.join(',')});`
}