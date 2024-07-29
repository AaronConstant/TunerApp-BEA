const checkName = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        const error = new Error('Enter a valid name or Name is required!');
        // This will update the error to be 400 for the error status and it will return the error as such in the next() return.
        error.status = 400; 
        return next(error);
    }

    next();
};

module.exports = { checkName }