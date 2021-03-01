function templateFieldValue(field: TemplateField, context: SessionNoteContext, template: string) {
    if (!context || !template) {
        return field.defaultValue;
    }
 
    const beginning = template.lastIndexOf("{") + 1,
        end = template.indexOf("}"),
        clean = template.substring(beginning, end);

    if (!clean)
        return field.defaultValue;

    const properties = clean.split("."),
        firstProp = properties.shift(),
        templateRemainingProps = `{{${properties.join(".")}}}`,
        target = context[Object.keys(context).find(k => k.toLowerCase() === firstProp.toLowerCase())],
        lastSegment = properties.length === 0;

    return lastSegment ? target : templateFieldValue(field, target, templateRemainingProps);
}
