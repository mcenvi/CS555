import os
import numpy as np
from ..services.data_load import load_data

def test_load_data_shapes():
    X_train, X_test, y_train, y_test = load_data()
    
    # Test if the data has the correct shape
    assert X_train.shape == (4500, 64, 795), f"Expected X_train shape (4500, 64, 795), got {X_train.shape}"
    assert X_test.shape == (750, 64, 795), f"Expected X_test shape (750, 64, 795), got {X_test.shape}"
    assert y_train.shape == (4500,), f"Expected y_train shape (4500,), got {y_train.shape}"
    assert y_test.shape == (750,), f"Expected y_test shape (750,), got {y_test.shape}"

def test_load_data_types():
    X_train, X_test, y_train, y_test = load_data()
    
    # Test if the data types are correct
    assert isinstance(X_train, np.ndarray), "Expected X_train to be a numpy array"
    assert isinstance(X_test, np.ndarray), "Expected X_test to be a numpy array"
    assert isinstance(y_train, np.ndarray), "Expected y_train to be a numpy array"
    assert isinstance(y_test, np.ndarray), "Expected y_test to be a numpy array"

def test_load_data_values():
    X_train, X_test, y_train, y_test = load_data()
    
    # Test if the label arrays contain expected number of unique categories
    assert len(np.unique(y_train)) == 5, f"Expected 5 unique categories in y_train, got {len(np.unique(y_train))}"
    assert len(np.unique(y_test)) == 5, f"Expected 5 unique categories in y_test, got {len(np.unique(y_test))}"
