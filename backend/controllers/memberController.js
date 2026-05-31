import db from '../config/db.js';

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export async function addMember(req, res, next) {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      membershipPlan,
      joiningDate,
      expiryDate,
      height,
      weight,
      status,
      trainerId,
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    const result = await runQuery(
      `INSERT INTO members (fullName, email, phone, gender, dob, address, membershipPlan, joiningDate, expiryDate, height, weight, photo, status, trainerId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        phone,
        gender,
        dob,
        address,
        membershipPlan,
        joiningDate,
        expiryDate,
        height || null,
        weight || null,
        photo,
        status || 'active',
        trainerId || null,
      ]
    );

    const member = await getQuery('SELECT * FROM members WHERE id = ?', [result.lastID]);
    res.status(201).json({ success: true, message: 'Member added successfully', data: member });
  } catch (error) {
    next(error);
  }
}

export async function updateMember(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await getQuery('SELECT * FROM members WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const photo = req.file ? req.file.filename : existing.photo;
    const {
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      membershipPlan,
      joiningDate,
      expiryDate,
      height,
      weight,
      status,
      trainerId,
    } = req.body;

    await runQuery(
      `UPDATE members SET fullName = ?, email = ?, phone = ?, gender = ?, dob = ?, address = ?, membershipPlan = ?, joiningDate = ?, expiryDate = ?, height = ?, weight = ?, photo = ?, status = ?, trainerId = ? WHERE id = ?`,
      [
        fullName || existing.fullName,
        email || existing.email,
        phone || existing.phone,
        gender || existing.gender,
        dob || existing.dob,
        address || existing.address,
        membershipPlan || existing.membershipPlan,
        joiningDate || existing.joiningDate,
        expiryDate || existing.expiryDate,
        height || existing.height,
        weight || existing.weight,
        photo,
        status || existing.status,
        trainerId || existing.trainerId,
        id,
      ]
    );

    const updatedMember = await getQuery('SELECT * FROM members WHERE id = ?', [id]);
    res.json({ success: true, message: 'Member updated successfully', data: updatedMember });
  } catch (error) {
    next(error);
  }
}

export async function deleteMember(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await getQuery('SELECT * FROM members WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    await runQuery('DELETE FROM members WHERE id = ?', [id]);
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getMemberById(req, res, next) {
  try {
    const { id } = req.params;
    const member = await getQuery('SELECT * FROM members WHERE id = ?', [id]);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, message: 'Member loaded successfully', data: member });
  } catch (error) {
    next(error);
  }
}

export async function getAllMembers(req, res, next) {
  try {
    const members = await allQuery('SELECT * FROM members ORDER BY createdAt DESC');
    res.json({ success: true, message: 'Members retrieved successfully', data: members });
  } catch (error) {
    next(error);
  }
}

export async function searchMembers(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }
    const query = `%${q}%`;
    const members = await allQuery(
      `SELECT * FROM members WHERE fullName LIKE ? OR email LIKE ? OR phone LIKE ? ORDER BY createdAt DESC`,
      [query, query, query]
    );
    res.json({ success: true, message: 'Search results returned', data: members });
  } catch (error) {
    next(error);
  }
}

export async function getExpiringMembers(req, res, next) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const members = await allQuery(
      'SELECT * FROM members WHERE expiryDate <= ? ORDER BY expiryDate ASC',
      [today]
    );
    res.json({ success: true, message: 'Expiring memberships returned', data: members });
  } catch (error) {
    next(error);
  }
}
