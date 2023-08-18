const express = require('express');

const test = (req, res) => {
    return res.status(200).json({message: 'Successful Connect'})
}
module.exports = {test};