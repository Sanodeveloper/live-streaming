export default function Error(): JSX.Element {
    return (
        <div className="border border-gray-600 w-[60%] mx-auto p-10">
            <h1 className="text-2xl text-red-500 text-center">エラーが発生しました。以下のことを確認してください</h1>
            <ul className="list-disc list-inside mt-5">
                <li>ログイン状態であること</li>
                <li>ネットワーク接続が正常であること</li>
                <li>リロードして再度お試しください</li>
                <li>問題が解決しない場合は、管理者にお問い合わせください</li>
            </ul>
        </div>
    )
}