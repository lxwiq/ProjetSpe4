const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        
        const { email, password } = req.body; 
        console.log(email, password); 
      
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
       
        if ( result.rows.length === 0 ) {
           
            return res.status(404).send('Utilisateur non trouvé');
        }
    
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash)
        const hash = await bcrypt.hash(password, 12);
        // ICI
        console.log(hash)  
        console.log(user.password_hash);

        console.log(match);
        bcrypt.compare(password, user.password_hash, function(err, isMatch) {
            console.log(user.password_hash)
            if (err) throw err;
            if (isMatch) {
                // Authentification réussi
                res.json({ message: 'Authentification réussie' });
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
                res.json({ data: [user,token]}); 
                res.status(200)
            } else {
                // Mot de passe incorrect
                res.status(401).send('Mot de passe incorrect');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'authentification');
    }



});
module.exports = router;
