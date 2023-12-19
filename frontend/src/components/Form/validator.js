const edadValidator = (value) => {
    return value >= 18 && value <= 65;
}

const rutValidator = (value) => {
    if (!/^[0-9]{7,9}[-|‐]{1}[0-9kK]{1}$/.test( value )) return false;

    const tmp 	= value.split('-');
    const digv	= tmp[1];
    const rut 	= tmp[0];
    if (digv == 'K') digv = 'k';
    return (dv(rut) == digv);
}

const dv = (T) => {
    let M = 0, S = 1;
    for(; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M ++% 6)) % 11;
    return S ? S-1 : 'k';
}

export {
    edadValidator,
    rutValidator
}