import { ArAccount } from 'arweave-account';
import { getAccount, getAccountHandle } from '../lib';
import { ColorScheme, ColorSchemeBlackText } from './colorScheme';

type Booleanish = boolean | 'true' | 'false';

/**
 * Handles setting data attributes based on boolean condition passed to it.
 *
 * @param {string} condition - A list of available colorSchemes.
 *
 * @example
 * <Button data-loading={dataAttr(loading)} />
 */
export const dataAttr = (condition: boolean | undefined) =>
  (condition ? '' : undefined) as Booleanish;

/**
 * Handles setting aria attributes based on boolean condition passed to it.
 *
 * @param {string} condition - A list of available colorSchemes.
 *
 * @example
 * <Button aria-disabled={ariaAttr(disabled || loading)} />
 */
export const ariaAttr = (condition: boolean | undefined) =>
  (condition ? true : undefined) as Booleanish;

function isOfColorSchemeBlackTextType(value: string): value is ColorSchemeBlackText {
  return ['sky', 'mint', 'lime', 'yellow', 'amber'].includes(value);
}

/**
 * This function is responsible for taking in the user selected colorScheme and returning the appropriate text color value for solid component variants.
 * This utility is specific to Radix colors and should not be used for arbitrary color values as it will not produce expected results.
 *
 * @param {string} colorScheme - A list of available colorSchemes.
 *
 * @example
 * getContrastingColor('violet')
 */
export const getContrastingColor = (colorScheme?: ColorScheme): string => {
  if (colorScheme && isOfColorSchemeBlackTextType(colorScheme)) {
    return 'black';
  } else {
    return `white`;
  }
};

interface AbbreviateAddressOptions {
  startChars?: number;
  endChars?: number;
  noOfEllipsis?: number;
}

export interface AbbreviateAddress {
  address: string | undefined;
  options?: AbbreviateAddressOptions;
}

export const abbreviateAddress = ({ address, options = {} }: AbbreviateAddress) => {
  const { startChars = 5, endChars = 4, noOfEllipsis = 2 } = options;

  const dot = '.';
  const firstFive = address?.substring(0, startChars);
  const lastFour = address?.substring(address.length - endChars);
  return `${firstFive}${dot.repeat(noOfEllipsis)}${lastFour}`;
};

export const accountFromAddress = async (address: string): Promise<ArAccount | undefined> => {
  const userAccount = await getAccount(address);

  return userAccount;
};
