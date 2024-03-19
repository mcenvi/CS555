import userRoutes from './users.js';

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    app.use('/login', userRoutes);
    app.use('/home', userRoutes);
    app.use('/logout', userRoutes);
    app.use('/error', userRoutes);
    
    app.use('*', (req, res) => {
        return res.status(404).json({error: 'Not found'});
    });
};

export default constructorMethod;