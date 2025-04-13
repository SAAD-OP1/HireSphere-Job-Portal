function isEmployee(req, res, next) {
    if (req.user.role === 'employee') return next();
    return res.status(403).json({ error: 'Access denied. Employees only.' });
}

function isEmployer(req, res, next) {
    if (req.user.role === 'employer') return next();
    return res.status(403).json({ error: 'Access denied. Employers only.' });
}

module.exports = { isEmployee, isEmployer };

