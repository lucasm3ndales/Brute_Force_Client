import { HashDTO } from "../models/hashDTO";


export const fetchHash = async (dto: HashDTO): Promise<string> => {
    return await fetch('http://localhost:8080/bruteForce/attack', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(dto),
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        console.log('Error:', err);
    });
}