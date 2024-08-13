const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 3001;

// app.use(cors(
//     {
//         origin: 'http://localhost:5173',
//         credentials: true,
//     }
// ));
app.use(express.json());
app.use(cookieParser());

const data1 = [
    {
        title: "test stream title 1",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と携帯性を持ちます。デスクトップ型は高い処理能力と拡張性を持ち、長時間の作業やゲーム、専門的なアプリケーションに適しています。一方、ノートブック型は持ち運びが容易で、外出先や移動中でも作業ができるため、ビジネスパーソンや学生に人気があります。現代のパソコンは、高速なプロセッサ、大容量のメモリ、ストレージ、高解像度ディスプレイなどを備え、インターネットへのアクセスやソフトウェアの利用が可能です。さらに、多くの周辺機器との接続が簡単で、日常生活や仕事の効率を大幅に向上させることができます。"
    },
    {
        title: "test stream title 2",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と携帯性を持ちます。デスクトップ型は高い処理能力と拡張性を持ち、長時間の作業やゲーム、専門的なアプリケーションに適しています。一方、ノートブック型は持ち運びが容易で、外出先や移動中でも作業ができるため、ビジネスパーソンや学生に人気があります。現代のパソコンは、高速なプロセッサ、大容量のメモリ、ストレージ、高解像度ディスプレイなどを備え、インターネットへのアクセスやソフトウェアの利用が可能です。さらに、多くの周辺機器との接続が簡単で、日常生活や仕事の効率を大幅に向上させることができます。"
    },
    {
        title: "test stream title 3",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と"
    }
];

const initData = [
    {
        title: "test stream title 1",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と携帯性を持ちます。デスクトップ型は高い処理能力と拡張性を持ち、長時間の作業やゲーム、専門的なアプリケーションに適しています。一方、ノートブック型は持ち運びが容易で、外出先や移動中でも作業ができるため、ビジネスパーソンや学生に人気があります。現代のパソコンは、高速なプロセッサ、大容量のメモリ、ストレージ、高解像度ディスプレイなどを備え、インターネットへのアクセスやソフトウェアの利用が可能です。さらに、多くの周辺機器との接続が簡単で、日常生活や仕事の効率を大幅に向上させることができます。"
    },
    {
        title: "test stream title 2",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12346,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と携帯性を持ちます。デスクトップ型は高い処理能力と拡張性を持ち、長時間の作業やゲーム、専門的なアプリケーションに適しています。一方、ノートブック型は持ち運びが容易で、外出先や移動中でも作業ができるため、ビジネスパーソンや学生に人気があります。現代のパソコンは、高速なプロセッサ、大容量のメモリ、ストレージ、高解像度ディスプレイなどを備え、インターネットへのアクセスやソフトウェアの利用が可能です。さらに、多くの周辺機器との接続が簡単で、日常生活や仕事の効率を大幅に向上させることができます。"
    },
    {
        title: "test stream title 3",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12347,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と"
    },
    {
        title: "test stream title 4",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12348,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と"
    },
    {
        title: "test stream title 5",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と"
    },
    {
        title: "test stream title 6",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と"
    },
    {
        title: "test stream title 7",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と"
    },
    {
        title: "test stream title 8",
        distributer: "distributer",
        peopleNum: 10,
        roomId: 12345,
        info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と"
    },
];

const hostData = {
    title: "test stream title 1",
    distributer: "distributer",
    peopleNum: 10,
    roomId: 12345,
    info: "パソコンは、情報処理や通信、エンターテインメントなど多用途に使用される電子機器です。 主にデスクトップ型とノートブック型があり、それぞれの用途に応じた性能と携帯性を持ちます。デスクトップ型は高い処理能力と拡張性を持ち、長時間の作業やゲーム、専門的なアプリケーションに適しています。一方、ノートブック型は持ち運びが容易で、外出先や移動中でも作業ができるため、ビジネスパーソンや学生に人気があります。現代のパソコンは、高速なプロセッサ、大容量のメモリ、ストレージ、高解像度ディスプレイなどを備え、インターネットへのアクセスやソフトウェアの利用が可能です。さらに、多くの周辺機器との接続が簡単で、日常生活や仕事の効率を大幅に向上させることができます。",
    roomState: {
        camOn: false,
        micOn: false,
        screenShareOn: false,
    }
};

app.get('/api/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

app.get('/api/user', (req, res) => {
    res.json({ name: 'test' });
});


app.get('/api/search', (req, res) => {
    const query = req.query;
    if (query.tags == 'initial' && query.keywords == 'initial') {
        res.json(initData);
        return;
    }
    console.log(query);
    res.json(data1);
});

app.get('/api/tags', (req, res) => {
    const tags = [
        "tag1",
        "tag2",
        "tag3",
        "tag4",
        "tag5",
        "tag6",
        "tag7",
        "tag8",
    ];
    res.json(tags);
});

app.post('/api/signup', (req, res) => {
    const query = req.body;
    console.log(query);
    res.status(400).json({});
});

app.post('/api/login', (req, res) => {
    const body = req.body;
    if (body.name == 'test' && body.password == 'test') {
        res.cookie('sessionId', 'testsessionid', {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        res.json({});
        return;
    }
    res.status(404).json({ error: 'not found user' });
});

app.get('/api/auth', (req, res) => {
    const cookie = req.cookies.sessionId;
    if (cookie == 'testsessionid') {
        res.status(200).json({ isAuth: true });
        return;
    }
    res.status(401).json({ isAuth: false });
});

app.post('/api/room/create', (req, res) => {
    const body = req.body;
    const cookie = req.cookies.sessionId;
    if (cookie != 'testsessionid') {
        res.status(401).json({ error: 'not authorized' });
        return;
    }
    console.log(body);
    res.status(200).json({ roomId: 12345 });
});

app.get('/api/room/host/get', (req, res) => {
    const roomId = req.query.roomId;
    const cookie = req.cookies.sessionId;
    if (cookie != 'testsessionid') {
        res.status(401).json({ error: 'not authorized' });
        return;
    }
    console.log(typeof roomId);
    console.log(roomId);
    res.json(hostData);
});

app.get('/api/room/listener/get', (req, res) => {
    const query = req.query;
    console.log(query);
    res.status(200).json(initData[0]);
});

app.delete('/api/room/delete', (req, res) => {
    const cookie = req.cookies.sessionId;
    if (cookie != 'testsessionid') {
        res.status(401).json({ error: 'not authorized' });
        return;
    }
    console.log("delete room");
    res.status(200).json({});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});