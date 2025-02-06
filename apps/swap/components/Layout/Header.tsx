"use client";

import Link from "next/link";
import { ConnectButton, Connector } from "@ant-design/web3";
import { createStyles } from "antd-style";
import { usePathname } from "next/navigation";

const useStyles = createStyles(({ css }) => {
  const active = css`
    text-decoration: underline;
    color: #000;
  `;

  return {
    header: css`
      height: 56px;
      line-height: 56px;
      padding-inline: 24px;
      background-color: #e8f1ff;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d7e1eb;
      .nav {
        display: flex;
        gap: 25px;

        .active {
          ${active}
        }

        a {
          color: #646464;
          &:hover {
            ${active}
          }
        }
      }
    `,
  };
});

const Header: React.FC = () => {
  const { styles, cx } = useStyles();
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <div className="title">Swap</div>
      <div className="nav">
        <Link className={cx({ active: pathname === "/" })} href="/">
          Swap
        </Link>
        <Link className={cx({ active: pathname === "/pool" })} href="/pool">
          Pool
        </Link>
      </div>
      <div>
        {/* <Connector
          modalProps={{
            mode: "simple",
          }}
        >
          <ConnectButton type="text" />
        </Connector> */}
      </div>
    </div>
  );
};

export default Header;
