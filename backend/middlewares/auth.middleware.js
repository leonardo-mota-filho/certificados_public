import jwt from 'jsonwebtoken';
const loginFreeRoutes = ['/adminLogin','/checkLogin','/getStudent/','/classesOfStudent/','/getClass/','/getCourse/',
'/updateRollCall','/postRollCall/','/getRollCall/','/certificateOfStudentClass/','/getImage/']

export const authMiddleware = (req, res, next) => {
    console.log(req.path)
    if(loginFreeRoutes.some(str => req.path.includes(str))){
        next()
    } else {
        const token = req.cookies['ADMIN_TOKEN']
        if (!token) {
            //res.redirect('http://localhost:5173/adminLogin')
            res.status(403).json({ message: 'Token não fornecido', redirect:true })
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    //res.redirect('http://localhost:5173/adminLogin')
                    res.status(403).json({ message: 'Token inválido',redirect:true }) 
                } else{
                    next()
                }
            })
        }  
    }
    
    
}
