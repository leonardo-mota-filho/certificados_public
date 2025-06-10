import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = "7d1f7c836c67bd3b284a63356552407818d6488856be2eaf654b0a9026a96c7"
export const adminLogin = (req,res) => {
    console.log("???")
    const { username, password } = req.body;
    const user = username == process.env.ADMIN_USER
    const pwd = password == process.env.ADMIN_PASSWORD
    if (!user || !pwd) {
        return res.status(401).json({ message: 'Credenciais inválidas' })
    }
    const tokenDuration = 60000 * 60 //ms
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: tokenDuration.toString() })
    res.cookie('ADMIN_TOKEN', token, {
        httpOnly: true,
        secure: true,
        //sameSite: 'strict',
        sameSite: 'none',
        maxAge: tokenDuration
    })
    res.send()
}

export const checkLogin = (req, res) => {
    const token = req.cookies['ADMIN_TOKEN']
    if (!token) {
        res.status(403).json({ message: 'Token não fornecido' });
        return;
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token inválido' });
            return;
        }
        res.send(true)
    });
};

export const logout = (req, res) => {
    try{
        res.cookie('ADMIN_TOKEN', '', {
        httpOnly: true,
        secure: true,
        //sameSite: 'strict',
        sameSite: 'none',
        maxAge: 0
    })
        res.send("LOGOUT")
    } catch(err){
        console.log(err)
        res.status(401).json({ message: 'Cookie não encontrado.' }).send()
    }
    
};