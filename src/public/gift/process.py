

import cv2
import numpy as np
import os

image_path = "/Users/lixumin/Desktop/code/react_native_project/Heartbeats/bini/src/public/gift/音符.png"

image = cv2.imread(image_path)
# 如果图像没有Alpha通道，添加一个
if image.shape[2] == 3:
    image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)

# 创建一个新的Alpha通道
alpha_channel = np.ones(image.shape[:2], dtype=image.dtype) * 255

# 生成掩码，超过(245, 245, 245)的像素位置为True
mask = np.all(image[:, :, :3] > (243, 243, 243), axis=-1)

# 将掩码应用到Alpha通道上，超过(245, 245, 245)的像素Alpha值为0
alpha_channel[mask] = 0

# 将Alpha通道添加到图像上
image[:, :, 3] = alpha_channel

# 保存带有Alpha通道的图像
output_path = os.path.splitext(image_path)[0] + "_with_alpha.png"
cv2.imwrite(output_path, image)

print(f"图像已保存到: {output_path}")