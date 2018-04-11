export function checkValues(values) {
    values.forEach((value) => {
        let type = typeof value;
        let errors = [];

        if (type === 'number') {
            if (value != null && /\\-?\\d+((,|\\.)\\d+)?/.test(value.toString())) {
                errors.push([value] + "n'est pas un nombre !");
            }
        }
        if (type === 'string') {
            if (value !== '' && value!= null && /\\w+/.test(value)) {
                errors.push([value] + "n'est pas une chaine de caractères !");
            }
        }
        if (errors.isEmpty()) {
            return false;
        } else {
            return errors;
        }
    })
}