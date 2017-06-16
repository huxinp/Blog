
export const generateSerialNumber = baseNumber => {
	//增加的条件
	//插入数据的时候增加一
	let newSerialNumber = baseNumber
	// function serialNumber(){
	// 	newSerialNumber++;
	// 	return newSerialNumber;
	// }
	// return serialNumber;
	return () => {
		newSerialNumber++;
		return newSerialNumber;
	}
};

// var serialNumber = generateSerialNumber(100000);

// var sid = serialNumber();

