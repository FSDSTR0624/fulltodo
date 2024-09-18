
const getUserInfo = (req, res) => {
    res.status(200).json({ firstname: "Jordi", lastname: "Galobart", email: "test@example.com" });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (email === "test@example.com" && password === "correctpassword") {
        res.status(200).json({ msg: "Login successful" });
    } else if (email === "test@example.com" && password !== "correctpassword") {
        res.status(403).json({ msg: "Forbidden" });
    } else {
        res.status(404).json({ msg: "User not found" });
    }
};

module.exports = {getUserInfo, loginUser}


