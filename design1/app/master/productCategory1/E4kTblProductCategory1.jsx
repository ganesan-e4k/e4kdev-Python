// src/components/ProductCategories.js
'use client'
import React, { useState } from 'react';
import {
  useGetProductCategories1Query,
  useCreateProductCategory1Mutation,
  useUpdateProductCategory1Mutation,
  useDeleteProductCategory1Mutation,
} from '../../store/services/e4kTblProductCategory1';

const E4kTblProductCategory1 = () => {
  const [companyId, setCompanyId] = useState('001');
  const {
    data,
    error,
    isLoading,
    isError,  
  } = useGetProductCategories1Query(companyId);
  const [createProductCategory, { isLoading: isCreating }] = useCreateProductCategory1Mutation();
  const [updateProductCategory, { isLoading: isUpdating }] = useUpdateProductCategory1Mutation();
  const [deleteProductCategory, { isLoading: isDeleting }] = useDeleteProductCategory1Mutation();

  const [newCategory, setNewCategory] = useState({ category: '', imagePath: '' });
  const [mutationError, setMutationError] = useState(null);

  const transformData = () =>{
    if (!data) return [];
    const datagrid = data.e4kTblproductProductCategory1.map(category =>({
      category1id : category.category1id,
      companyid: category.companyid.companyid,
      category: category.description,
      imagePath: category.imagepath,

    }))
    console.log("datagrid=", datagrid)

  }
  const handleCreate = async () => {
    try {
      const result = await deleteProductCategory({
        
        companyid: "001",
        
        category1id:69

      });
  
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        // Handle success case here
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  }



  const handleUpdate = async (category) => {
    try {
      setMutationError(null);
      const updatedCategory = { ...category, category: 'Updated Category', imagePath: 'Updated ImagePath' };
      await updateProductCategory({ ...updatedCategory, companyid: companyId }).unwrap();
    } catch (error) {
      setMutationError(error);
    }
  };

  const handleDelete = async (category1id) => {
    try {
      setMutationError(null);
      await deleteProductCategory({ category1id, companyid: companyId }).unwrap();
    } catch (error) {
      setMutationError(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
console.log("data",data.e4kTblproductProductCategory1)
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input
        type="text"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        placeholder="Enter Company ID"
      />
      <div>
        <input
          type="text"
          value={newCategory.category}
          onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
          placeholder="Category Name"
        />
        <input
          type="text"
          value={newCategory.imagePath}
          onChange={(e) => setNewCategory({ ...newCategory, imagePath: e.target.value })}
          placeholder="Image Path"
        />
        <button onClick={transformData}>Create Category</button>
      </div>
      {mutationError && (
        <div className="error">
          Error: {mutationError.message || 'An error occurred while performing the mutation'}
        </div>
      )}
      {/* {data.data.e4kTblproductProductCategory1?.map((category) => (
        <div key={category.category1id}>
          <h3>{category.description}</h3>
          <img src={category.imagepath} alt={category.description} />
          <button onClick={() => handleUpdate(category)}>Update</button>
          <button onClick={() => handleDelete(category.category1id)}>Delete</button>
        </div>
      ))} */}
    </div>
  );
};

export default E4kTblProductCategory1;
