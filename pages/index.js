import Head from 'next/head';
import Link from 'next/link';
import { Button, Card, PageHeader, Space, Typography, Steps } from '@arco-design/web-react';

const Step = Steps.Step;

import IconGithub from '../public/images/github.svg';

export default function Home() {
    return (
        <>
            <Head>
                <title>Databases</title>
                <meta name="description" content="Lets change" />
                <link rel="icon" href="/favicon.svg" />
                <style>{'body { overflow: auto !important;color: white !imporntant'}</style>
            </Head>
            <div className="index-container">
                <PageHeader
                    style={{
                        position: 'sticky',
                        top: 0,
                        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                        zIndex: 2,
                        backgroundColor: '#007bff',
                        height: '80px',
                        color: 'white !imporntant',
                    }}
                    subTitle="Lets revolutionalise"
                    extra={
                        <Space>
                            <Link href="/graphs">
                                <Button
                                    type="primary"
                                    style={{ backgroundColor: 'green', color: 'white' }}
                                >
                                    Click and start
                                </Button>
                            </Link>
                        </Space>
                    }
                />
                <div className="index-bg">
                    <Typography.Title className="tc" type="secondary"></Typography.Title>
                    <Link href="/graphs">
                        <Button
                            type="primary"
                            size="large"
                            className="start-button"
                            style={{
                                fontSize: '2em',
                                height: 'auto',
                            }}
                        >
                            Click here please to start
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
