import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { VisualOptionCards } from "@/components/organisms";

export const buildingTheInverseBlocks: ReactElement[] = [
    <StackLayout key="layout-inverse-heading" maxWidth="xl">
        <Block id="inverse-heading" padding="md">
            <EditableH2 id="h2-inverse-heading" blockId="inverse-heading">
                Building the Inverse
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-idea" maxWidth="xl">
        <Block id="inverse-idea" padding="sm">
            <EditableParagraph id="para-inverse-idea" blockId="inverse-idea">
                The inverse of a matrix is the matrix that undoes it, so that{" "}
                <InlineFormula latex="A A^{-1}" /> leaves everything unchanged.
                It is not one over each entry. Building it takes three moves:
                swap the two entries on the main diagonal, negate the other two,
                then divide everything by the determinant.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-formula" maxWidth="xl">
        <Block id="inverse-formula" padding="lg">
            <FormulaBlock latex="\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-visual" maxWidth="xl">
        <Block id="inverse-visual" padding="sm">
            <VisualOptionCards
                blockId="inverse-visual"
                intro="Pick how your students will build the inverse of a 2x2 matrix."
                cards={[
                    {
                        id: "three-step-builder",
                        title: "A three-step builder: swap, negate, then divide",
                        looks: "The original matrix beside a working copy that changes one step at a time, with the entries that moved or changed sign marked, and the determinant shown as the divider in the final step.",
                        manipulate: "Students step forward and back through swap, negate and divide, and change the original entries at any point.",
                        reveals: "Which two entries swap, which two change sign, and that the division by the determinant is part of the answer, not an optional extra.",
                        targetsMisconception: "Students mix up which entries to swap and which to negate, and forget to divide by the determinant",
                        recommended: true,
                    },
                    {
                        id: "undo-check",
                        title: "A checker that multiplies the matrix by its candidate inverse",
                        looks: "The matrix, a candidate inverse the student assembles, and the product of the two shown as it stands.",
                        manipulate: "Students choose how to swap, negate and divide, then multiply to see whether the product really is the identity matrix.",
                        reveals: "Only the correct swap, the correct signs and the division by the determinant give a product that undoes the original.",
                        targetsMisconception: "Students think the inverse means taking 1 over each entry",
                    },
                    {
                        id: "reciprocal-compare",
                        title: "The correct inverse against the one-over-each-entry guess",
                        looks: "Two candidate inverses of the same matrix side by side, each multiplied by the original with both products displayed.",
                        manipulate: "Students edit the original matrix and compare what each candidate produces.",
                        reveals: "One over each entry does not undo the matrix, while the swap, negate and divide recipe does.",
                        targetsMisconception: "Students think the inverse means taking 1 over each entry",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-summary" maxWidth="xl">
        <Block id="inverse-summary" padding="sm">
            <EditableParagraph id="para-inverse-summary" blockId="inverse-summary">
                Keep the three moves in that order and check your work by
                multiplying: a correct inverse always returns the identity
                matrix. Notice too that the recipe divides by the determinant,
                which raises an awkward question about matrices whose
                determinant is zero.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
