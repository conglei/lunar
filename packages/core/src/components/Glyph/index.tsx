import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import { css } from '../../composers/withStyles';

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
const fractionProp = mutuallyExclusiveTrueProps('diagonal', 'stacked');

// istanbul ignore next
function getNumericVariant(props: Partial<Props>): string {
  const variants: string[] = [];

  if (props.diagonal) {
    variants.push('diagonal-fractions');
  } else if (props.stacked) {
    variants.push('stacked-fractions');
  }

  if (props.ordinal) {
    variants.push('ordinal');
  }

  if (props.slashed) {
    variants.push('slashed-zero');
  }

  if (props.tabular) {
    variants.push('tabular-nums');
  }

  return variants.length > 0 ? variants.join(' ') : 'normal';
}

export type Props = {
  /** Text to apply glyph to. */
  children: NonNullable<React.ReactNode>;
  /** Display fraction numerators and denominators as smaller and separated by a diagonal slash. */
  diagonal?: boolean;
  /** Display ordinal markers for numbers. */
  ordinal?: boolean;
  /** Display zeros with a slash. */
  slashed?: boolean;
  /** Display fraction numerators and denominators as smaller, stacked, and separated by a horizontal line. */
  stacked?: boolean;
  /** Displays numbers as the same size, for easier table/vertical alignment. */
  tabular?: boolean;
};

/** Controls hidden and alternative glyphs within the current font. */
export default class Glyph extends React.Component<Props> {
  static propTypes = {
    diagonal: fractionProp,
    stacked: fractionProp,
  };

  static defaultProps = {
    diagonal: false,
    ordinal: false,
    slashed: false,
    stacked: false,
    tabular: false,
  };

  render() {
    const { children, ...props } = this.props;

    return <span {...css({ fontVariantNumeric: getNumericVariant(props) })}>{children}</span>;
  }
}
