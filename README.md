# yamaha-wol-custom-gui
yamahaルータのカスタムUIを用いてWake On Lanを送信します。

## 対応機種
RTX1210 RTX1200 RTX830 RTX810 NVR700W NVR510 NVR500 FWX120

## 使用方法
### 1. このファイルをルータにコピーします。
```
copy usb1:/wol.html /wol.html
```
### 2. カスタムUIの設定をルータに書き込みます。
```
login user wol wol
httpd custom-gui use on
httpd custom-gui user wol directory=/ index=wol.html
```

### 使い方
