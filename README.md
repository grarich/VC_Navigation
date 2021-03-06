# VC Navigation

Discord の VC に常駐する Bot

## 使い方

### 準備

- ローカル環境で動作させる場合、または VPS など自分の環境でホストする場合  
  `.env`ファイルを作成し、`.env.sample`のように Discord Bot のトークン、サーバー ID、自分の ID を記述する。

### VC に接続する

`/connect <VoiceChannel>`  
VC に接続し常駐する。

- `VoiceChannel` (Required) : 有効な VC の*チャンネル ID*, _名前_, _メンション_

### VC から切断する

`/disconnect`

### Bot の名前を変更する

`/change_name <name>`

- `name` (Required) : Bot に設定する名前

### Bot のニックネームを変更する

`/change_nick <nickname>`

- `nick_name` (Optional) : Bot に設定するニックネーム

### Bot のアイコンを変更する

`/change_icon <image>`

- `image` (Optional) : Bot に設定したいアイコン

### Bot のアクティビティを変更する

`/change_activity <details>`

- `details` (Optional) : アクティビティの詳細は Discord Developers Docs のリンクを参照してください。

https://discord.com/developers/docs/rich-presence/how-to#updating-presence-update-presence-payload-fields
