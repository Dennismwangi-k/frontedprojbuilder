import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
    List,
    Button,
    Empty,
    Space,
    Avatar,
    Popconfirm,
    Notification,
    Divider,
    Tag,
} from '@arco-design/web-react';
import {
    IconEdit,
    IconDelete,
    IconNav,
    IconCalendarClock,
    IconCopy,
} from '@arco-design/web-react/icon';
import { useState, useEffect } from 'react';
import { addGraph, delGraph, getAllGraphs } from '../../data/db';
import ListNav from '../../components/list_nav';
import northwindTraders from '../../data/example/northwind_traders.json';
import blog from '../../data/example/blog.json';
import spaceX from '../../data/example/spacex.json';

const ImportModal = dynamic(() => import('../../components/import_modal'), { ssr: false });

export default function Home() {
    const router = useRouter();
    const [graphs, setGraphs] = useState([]);
    const [showModal, setShowModal] = useState('');

    useEffect(() => {
        const initGraphs = async () => {
            try {
                const data = await getAllGraphs();
                if (data && data.length) {
                    data.sort((a, b) => b.createdAt - a.createdAt);
                    setGraphs(data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        initGraphs();
    }, []);

    const deleteGraph = async id => {
        await delGraph(id);
        setGraphs(state => state.filter(item => item.id !== id));
    };

    const handlerImportGraph = async ({ tableDict, linkDict }) => {
        const id = await addGraph({ tableDict, linkDict, name: `Untitled graph ${graphs.length}` });
        router.push(`/graphs/${id}`);
    };

    const handlerAddGraph = async () => {
        const id = await addGraph({ name: `Untitled graph ${graphs.length}` });
        router.push(`/graphs/${id}`);
    };

    const handlerAddExample = async () => {
        await Promise.all(
            [northwindTraders, blog, spaceX].map(({ id, ...item }) => addGraph(item, id))
        );
        setGraphs(state => [northwindTraders, blog, spaceX, ...state]);
        Notification.success({
            title: 'Sample data generated success.',
        });
    };

    return (
        <>
            <Head>
                <title>Databases</title>
                <meta name="description" content="Lets Revolutionilise" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <ListNav
                addGraph={() => handlerAddGraph()}
                importGraph={() => setShowModal('import')}
                addExample={() => handlerAddExample()}
            />
            <div className="graph-container">
                {graphs && graphs.length ? (
                    <List
                        className="graph-list"
                        size="large"
                        header="Graphs"
                        dataSource={graphs}
                        render={(item, index) => (
                            <List.Item
                                key={item.id}
                                extra={
                                    <Space>
                                        <Link href={`/graphs/${item.id}`}>
                                            <Button
                                                type="primary"
                                                icon={<IconEdit />}
                                                style={{
                                                    backgroundColor: 'green',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                        <Popconfirm
                                            title="Are you sure to delete this graph?"
                                            okText="Yes"
                                            cancelText="No"
                                            position="br"
                                            onOk={() => deleteGraph(item.id)}
                                        >
                                            <Button
                                                type="primary"
                                                status="danger"
                                                icon={<IconDelete />}
                                                style={{ backgroundColor: 'red' }}
                                            >
                                                Delete
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar shape="square">{item.name[0]}</Avatar>}
                                    title={item.name}
                                    description={
                                        <Space style={{ marginTop: 4 }}>
                                            {item.tableDict ? (
                                                <Tag color="#1890ff" icon={<IconNav />}>
                                                    {Object.keys(item.tableDict).length} tables
                                                </Tag>
                                            ) : null}
                                            <Tag color="#fadb14" icon={<IconCopy />}>
                                                Created at{' '}
                                                {new Date(item.createdAt).toLocaleString()}
                                            </Tag>
                                            <Tag color="#d48806" icon={<IconCalendarClock />}>
                                                Updated at{' '}
                                                {new Date(item.updatedAt).toLocaleString()}
                                            </Tag>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <div className="graph-list-btns">
                        <Empty style={{ marginBottom: 16 }} />
                        <Button size="large" type="primary" onClick={() => handlerAddGraph()}>
                            Create new graph now
                        </Button>
                        <Divider orientation="center">OR</Divider>
                        <Button size="large" type="outline" onClick={() => handlerAddExample()}>
                            Create new graph example
                        </Button>
                    </div>
                )}
            </div>
            <ImportModal
                showModal={showModal}
                onCloseModal={() => setShowModal('')}
                cb={args => handlerImportGraph(args)}
            />
        </>
    );
}
