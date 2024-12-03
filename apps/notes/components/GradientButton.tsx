import React from 'react';
import { Button, ConfigProvider, theme, type ButtonProps } from 'antd';
import { createStyles } from 'antd-style';

const { useToken } = theme;

interface IProps extends ButtonProps {
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}

const useStyles = createStyles(() => ({
  btn: {
    ':disabled': {
      background: 'var(--white-opacity-05)',
    },
  },
}));

const GradientButton = ({ width, height, children, style, className, ...rest }: IProps) => {
  const { token } = useToken();
  const { styles, cx } = useStyles();

  const primaryGradient = token.Button?.defaultHoverBg;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: primaryGradient,
            defaultHoverBg: `linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), ${primaryGradient}`,
            defaultColor: 'black',
            defaultBorderColor: 'none',
            fontSize: 16,
          },
        },
      }}
    >
      <Button className={cx(styles.btn, className)} style={{ width, height, ...style }} {...rest}>
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default GradientButton;
