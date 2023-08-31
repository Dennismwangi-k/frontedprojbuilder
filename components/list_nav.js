import { Space, Button, Switch } from '@arco-design/web-react';
import { IconSunFill, IconMoonFill } from '@arco-design/web-react/icon';
import Link from 'next/link';
import graphState from '../hooks/use-graph-state';

export default function ListNav({ importGraph, addGraph, addExample }) {
    const { theme, setTheme } = graphState.useContainer();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#007bff',
                height: '80px',
                borderRadius: '10px',
            }}
        >
            <div>
                <Link href="/" passHref>
                    Lets Revolutionilise
                </Link>
            </div>
            <Space>
                <Button
                    size="small"
                    type="outline"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => importGraph()}
                >
                    create tables
                </Button>
                <Button
                    size="small"
                    type="primary"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => addGraph()}
                >
                    New Spaces
                </Button>
                <Button
                    size="small"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => addExample()}
                >
                    Graph Examples
                </Button>
            </Space>
        </div>
    );
}
