import { database } from './dataSource.js'

const createUserDao = async (email, password, name, points) => {
  try {
    const result = await database.query(
      `INSERT INTO users (
            email,
            password,
            name,
            points
        ) VALUES (
          ?, ?, ?, ?)`,
      [email, password, name, points]
    )
    if (result.affectedRows > 0) {
      await database.query(
        `INSERT INTO users_payment (
          user_id,
          points
        ) VALUES (?, 500000)`,
        [result.insertId]
      )
    } else {
      const error = new Error('Create_Not_User')
      error.statusCode = 401
    }
  } catch (err) {
    const error = new Error('Invalid_Data_Input')
    error.statusCode = 400
    throw error
  }
}

const getUserByEmailDao = async (email) => {
  try {
    const [user] = await database.query(
      `SELECT 
        u.id,
        u.email,
        u.password,
        u.name,
        u.points
        FROM users u
        WHERE u.email = ?
        `,
      [email]
    )
    return user
  } catch (err) {
    const error = new Error('Invalid_Data_Input')
    error.statusCode = 400
    throw error
  }
}

const getUserByIdDao = async (userId) => {
  try {
    const [ user ] = await database.query(
      `SELECT 
        u.id,
        u.email,
        u.password,
        u.name,
        u.points
      FROM users u
      WHERE u.id = ?
      `,
      [userId]
    )
    return user
  } catch (err) {
    const error = new Error('Invalid_Data_Input')
    error.statusCode = 400
    throw error
  }
}

const deleteUserByIdDao = async (userId) => {
  try { 
    await database.query(
      `DELETE FROM
        address
      WHERE user_id = ?`,
      [userId]
    );

    await database.query(
      `DELETE FROM
        users
      WHERE id = ?`,
      [userId]
    )
  } catch (err) {
    const error = new Error('Invalid_Data_Input')
    error.statusCode = 400
    throw error
  }
}

const updateUserByIdDao = async (userId, updatedUserData) => {
  try {
    return await database.query(
      `UPDATE users
       SET email = ?,
           password = ?,
           name = ?
       WHERE id = ?`,
      [data.email, data.password, data.name, userId]
    )
  } catch (err) {
    const error = new Error('Invalid_Data_Input')
    error.statusCode = 400
    throw error
  }
};

const updateAddressDao = async(
  userId, address1, address2, userName, phoneNumber, memo) => {
  try {
    const result = await database.query(
      `INSERT INTO address (
        address_1,
        address_2,
        user_name,
        phone_number,
        memo,
        user_id
      ) VALUES (?, ?, ?, ?, ?, ?)
      `,
        [address1, address2, userName, phoneNumber, memo, userId]
        )
        return result
      } catch(err) {
        console.log(err)
        const error = new Error('Invalid_Data_Input')
        error.statusCode = 400
        throw error
      }
    }

export {
  createUserDao,
  getUserByEmailDao,
  getUserByIdDao,
  deleteUserByIdDao,
  updateUserByIdDao,
  updateAddressDao
}