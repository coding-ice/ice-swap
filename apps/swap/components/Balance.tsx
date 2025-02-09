import useTokenAddress from "@/hooks/useTokenAddress";
import { useReadErc20BalanceOf } from "@/utils/contracts";
import { CryptoPrice, Token } from "@ant-design/web3";
import { useAccount } from "wagmi";

interface BalanceProps {
  token?: Token;
}

const Balance: React.FC<BalanceProps> = (props) => {
  const { token } = props;
  const { address } = useAccount();
  const tokenAddress = useTokenAddress(token);

  const { data: balance } = useReadErc20BalanceOf({
    address: tokenAddress,
    args: [address as `0x${string}`],
    query: {
      enabled: !!tokenAddress,
      refetchInterval: 3000,
    },
  });

  return balance === undefined ? (
    "-"
  ) : (
    <CryptoPrice
      value={balance}
      symbol={props.token?.symbol}
      decimals={props.token?.decimal}
      fixed={2}
    />
  );
};

export default Balance;
