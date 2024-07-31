const mongoose = require('mongoose');

const adminUsersSchema = new mongoose.Schema({
    admins: {
        type: Array
    }

});

const AdminUsers = mongoose.model('adminuser', adminUsersSchema);

module.exports = AdminUsers;