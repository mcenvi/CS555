import os
import numpy as np
import torch
from torch.utils.data import DataLoader, TensorDataset


def load_data():
    # Update the paths if your data is stored in different files or formats
    X_train = np.load(os.path.join('./data/raw', 'train_data.npy'))
    X_test = np.load(os.path.join('./data/raw', 'test_data.npy'))
    y_train = np.load(os.path.join('./data/raw', 'train_label.npy'))
    y_test = np.load(os.path.join('./data/raw', 'test_label.npy'))
    return X_train, X_test, y_train, y_test