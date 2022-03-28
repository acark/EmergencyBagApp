import {Gender} from '../../utils/Constants';

const INITIAL_ITEMS = {
  items: [],
};

const NOTES = {
  notes: [],
};

const PERSONAL_INFO = {
  height: 170,
  age: 18,
  name: 'Kullanıcı',
  surname: 'Adı',
  weight: 70,
  weightDecimal: 0,
  gender: Gender.male,
  bloodType: 0,
};

export const personal_info_reducer = (state = PERSONAL_INFO, action) => {
  switch (action.type) {
    case 'SET_HEIGHT':
      return {...state, height: action.height};
    case 'SET_AGE':
      return {...state, age: action.age};
    case 'SET_NAME':
      return {...state, name: action.name};
    case 'SET_SURNAME':
      return {...state, surname: action.surname};
    case 'SET_WEIGHT':
      return {...state, weight: action.weight};
    case 'SET_WEIGHT_DECIMAL':
      return {...state, weightDecimal: action.weightDecimal};
    case 'SET_BLOOD_TYPE':
      return {...state, bloodType: action.bloodType};
    case 'SET_GENDER':
      return {...state, gender: action.gender};
    default:
      return state;
  }
};

export const itemReducer = (state = INITIAL_ITEMS, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {...state, items: [...state.items, action.items]};
    default:
      return state;
  }
};

export const notesReducer = (state = NOTES, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return {...state, notes: [...state.notes, action.notes]};
    case 'UPDATE_NOTES':
      for (let i = 0; i < state.notes.length; i++) {
        if (state.notes[i].id === action.notes.id) {
          state.notes[i].title = action.notes.title;
          state.notes[i].body = action.notes.body;
          state.notes[i].backgroundColor = action.notes.backgroundColor;
          state.notes[i].date = action.notes.date;
          break;
        }
      }
      return state;
    case 'DELETE_NOTES':
      const selectedIDs = action.notes;
      if (selectedIDs?.length <= 0) {
        return state;
      }

      const filteredNotes = state.notes.filter(
        item => !selectedIDs.includes(item.id),
      );

      return {...state, notes: filteredNotes};
    default:
      return state;
  }
};
