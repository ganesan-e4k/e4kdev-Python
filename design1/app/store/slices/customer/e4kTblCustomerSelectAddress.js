// slices/selectAddressSlice.jsaddressSelect
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addressSelect: {},
};

const CustomerSelectAddress = createSlice({
  name: 'selectAddress',
  initialState,
  reducers: {
    setSelectAddress: (state, action) => {
      state.addressSelect = action.payload;
    },
    addSelectAddress: (state, action) => {
      state.addressSelect = { ...state.addressSelect, ...action.payload };
    },
    removeSelectAddressProperty: (state, action) => {
      const { key } = action.payload;
      const { [key]: _, ...rest } = state.addressSelect;
      state.addressSelect = rest;
    },
    resetSelectAddress: (state) => {
      state.addressSelect = initialState.addressSelect;
    },
  },
});

export const {
  setSelectAddress,
  addSelectAddress,
  removeSelectAddressProperty,
  resetSelectAddress,
} = CustomerSelectAddress.actions;

export default CustomerSelectAddress.reducer;
