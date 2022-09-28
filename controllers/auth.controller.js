export const register = (req, res) => {
    console.log(req.body)
    res.send({ ok: "register" })
}