const setItemsAction = items => ({
  type: 'SET_ITEMS',
  items,
});

const setNotesAction = notes => ({
  type: 'SET_NOTES',
  notes,
});

const deleteNotesAction = notes => ({
  type: 'DELETE_NOTES',
  notes,
});

const updateNotesAction = notes => ({
  type: 'UPDATE_NOTES',
  notes,
});

const setHeight = height => ({
  type: 'SET_HEIGHT',
  height,
});
const setAge = age => ({
  type: 'SET_AGE',
  age,
});
const setName = name => ({
  type: 'SET_NAME',
  name,
});
const setSurname = surname => ({
  type: 'SET_SURNAME',
  surname,
});
const setWeight = weight => ({
  type: 'SET_WEIGHT',
  weight,
});

const setWeightDecimal = weightDecimal => ({
  type: 'SET_WEIGHT_DECIMAL',
  weightDecimal,
});

const setGender = gender => ({
  type: 'SET_GENDER',
  gender,
});

const setBloodType = bloodType => ({
  type: 'SET_BLOOD_TYPE',
  bloodType,
});

export {
  setItemsAction,
  setHeight,
  setName,
  setSurname,
  setAge,
  setWeight,
  setWeightDecimal,
  setGender,
  setBloodType,
  setNotesAction,
  deleteNotesAction,
  updateNotesAction,
};
