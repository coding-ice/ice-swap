// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.24;

import "./interfaces/IPool.sol";
import "./interfaces/IFactory.sol";

contract Pool is IPool {
    address public immutable override factory;
    address public immutable override token0;
    address public immutable override token1;
    int24 public immutable override tickLower;
    int24 public immutable override tickUpper;
    uint24 public immutable override fee;

    uint160 public override sqrtPriceX96;
    int24 public override tick;
    uint128 public override liquidity;

    struct Position {
        // 该 Position 拥有的流动性
        uint256 liquidity;
        // 可提取的 token0 数量
        uint256 tokensOwed0;
        // 可提取的 token1 数量
        uint256 tokensOwed1;
        // 上次提取手续费时的 feeGrowthGlobal0X128
        uint256 feeGrowthInside0LastX128;
        // 上次提取手续费时的 feeGrowthGlobal1X128
        uint256 feeGrowthInside1LastX128;
    }

    // 头寸信息
    mapping(address => Position) public positions;

    constructor() {
        (factory, token0, token1, tickLower, tickUpper, fee) = IFactory(
            msg.sender
        ).parameters();
    }

    function initialize(uint160 _sqrtPriceX96) external override {
        sqrtPriceX96 = _sqrtPriceX96;
    }

    function mint(
        address recipient,
        uint128 amount,
        bytes calldata data
    ) external override returns (uint256 amount0, uint256 amount1) {
        // 基于 amount 计算出当前需要多少 amount0 和 amount1
        // TODO 当前先写个假的

        (amount0, amount1) = (amount / 2, amount / 2);
        // 把流动性记录到对应的 position 中
        positions[recipient].liquidity += amount;

        // ???
        // 回调 mintCallback
        IMintCallback(recipient).mintCallback(amount0, amount1, data);
        // TODO 检查钱到位了没有，如果到位了对应修改相关信息
    }

    function collect(
        address recipient
    ) external returns (uint128 amount0, uint128 amount1) {
        // 获取当前用户的 position，TODO recipient 应该改为 msg.sender
        Position storage position = positions[recipient];

        // TODO 把钱退给用户 recipient
        // 修改 position 中的信息
        position.tokensOwed0 -= amount0;
        position.tokensOwed1 -= amount1;
    }

    function burn(
        uint128 amount
    ) external override returns (uint256 amount0, uint256 amount1) {
        // 修改 positions 中的信息
        positions[msg.sender].liquidity -= amount;

        // 获取燃烧后的 amount0 和 amount1
        // TODO 当前先写个假的
        (amount0, amount1) = (amount / 2, amount / 2);
        positions[msg.sender].tokensOwed0 += amount0;
        positions[msg.sender].tokensOwed1 += amount1;
    }

    function swap(
        address recipient,
        bool zeroForOne,
        int256 amountSpecified,
        uint160 sqrtPriceLimitX96,
        bytes calldata data
    ) external override returns (int256 amount0, int256 amount1) {}
}
