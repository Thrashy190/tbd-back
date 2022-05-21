const oracledb = require('oracledb');

const config = {
  user: 'tba',
  password: 'tba',
  connectString: 'localhost/XEPDB1',
};

// const config = {
//     user: 'hr',
//     password: 'hr',
//     connectString: 'localhost/XEPDB1',
//   };

async function Open(sql, binds, autoCommit) {
  let cnn = await oracledb.getConnection(config);
  let result = await cnn.execute(sql, binds, { autoCommit });
  cnn.release();
  return result;
}

exports.Open = Open;
