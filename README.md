## 注意点
以下の通りに実行しても動きません。あくまで参考程度にしてください。
agoraという配信APIを提供しているサービスを利用しているため。
.envファイルをlive_streamingフォルダに作成し、
```
VITE_AGORA_APP_ID="YOUR_AGORA_ID"
VITE_BACK_API_URL="http://localhost:8080/api"
VITE_SOCKET_API_URL="http://localhost:8000"
```
を記入してください。
これで多分動くはず。

## liveappの環境構築
好きなディレクトリに移動する。
```
mkdir workdir
cd workdir
```

そこで以下のコマンドを入力する。
```
git clone https://github.com/Sanodeveloper/live-streaming.git
```

migratorでmysqlにテーブルを構築する。
```
docker compose up -d --build mysql migrator
```

以下の実行して"MySQL is up - executing command"となれば成功。これでマイグレーションは終了。
```
docker compose logs -f migrator
```

次に、compose.yamlファイルのmigratorをコメントアウトする

次に、以下のコマンドを実行する
```
docker compose up -d --build
```
これで環境構築は終了である。

 - [こちらから確認できる](http://localhost:5173/)
