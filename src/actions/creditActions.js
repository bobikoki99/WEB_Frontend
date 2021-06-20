
export const createCredit = async (data) => {
    const response = await fetch('http://localhost/backend/api/credit/create.php', {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    });
    return response.json();
}

export const getCredit = async (id) => {
    const response = await fetch(`http://localhost/backend/api/credit/read_single.php?id=${id}`, {
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

export const checkPassword = async (id, password) => {
    const response = await fetch(`http://localhost/backend/api/credit/check_password.php?id=${id}&pass=${password}`, {
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
};
