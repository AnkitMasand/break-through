
function authKey(strUserId, strPassword) {

	var strUserPasswordKey = strUserId + ":" + strPassword;
	var strBase64Key = new Buffer(strUserPasswordKey).toString('base64');

	var strAuthKey = "Basic " + strBase64Key;

	return strAuthKey;

}

module.exports = {
	authKey: authKey
}
