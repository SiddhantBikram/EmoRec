import torch
import torch.nn as nn
from configs import *
from sklearn.metrics import precision_score, recall_score, f1_score, classification_report, accuracy_score
import torchvision.datasets as datasets
from torchvision import transforms
import os
import tqdm
import laion_clap

class audio_text_model(nn.Module):
    def __init__(self):
        super(audio_text_model, self).__init__()

        self.dropout = nn.Dropout(0.25)
        self.pool = nn.MaxPool2d((2,2))
        self.act = nn.ReLU()

        self.conv1 = nn.Conv2d(64,(3,3),padding = 'same')
        self.bn1 = nn.BatchNorm2d(64)

        self.conv2 = nn.Conv2d(128,(5,5),padding = 'same')
        self.bn2 = nn.BatchNorm2d(128)

        self.conv3 = nn.Conv2d(512,(3,3),padding = 'same')
        self.bn3 = nn.BatchNorm2d(512)

        self.conv4 = nn.Conv2d(512,(3,3),padding = 'same')
        self.bn4 = nn.BatchNorm2d(512)

        self.flatten = nn.Flatten()

        self.fc1 = nn.Linear(512,256)
        self.fc2 = nn.Linear(256,512)
        self.fc3 = nn.Linear(512,n_classes)

    def forward(self, x):
        x = self.dropout(self.pool(self.act(self.bn1(self.conv1(x)))))
        x = self.dropout(self.pool(self.act(self.bn2(self.conv2(x)))))
        x = self.dropout(self.pool(self.act(self.bn3(self.conv3(x)))))
        x = self.dropout(self.pool(self.act(self.bn4(self.conv4(x)))))

        x = self.flatten(x)
        x = self.fc3(self.fc2(self.fc1(x)))

        return x
    
def main():
    