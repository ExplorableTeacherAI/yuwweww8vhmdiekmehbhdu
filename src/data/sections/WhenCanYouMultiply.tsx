import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const whenCanYouMultiplyBlocks: ReactElement[] = [
    <StackLayout key="layout-size-rule-heading" maxWidth="xl">
        <Block id="size-rule-heading" padding="md">
            <EditableH2 id="h2-size-rule-heading" blockId="size-rule-heading">
                When Can You Multiply?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-idea" maxWidth="xl">
        <Block id="size-rule-idea" padding="sm">
            <EditableParagraph id="para-size-rule-idea" blockId="size-rule-idea">
                A row can only meet a column if they hold the same count of
                numbers. Three sales figures need three prices; three sales
                figures and four prices leave a number with no partner. So a{" "}
                <InlineFormula latex="2 \times 3" /> matrix multiplies a{" "}
                <InlineFormula latex="3 \times 4" /> matrix, but not every pair
                works.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-visual" maxWidth="xl">
        <Block id="size-rule-visual" padding="sm">
            <VisualOptionCards
                blockId="size-rule-visual"
                intro="Pick how your students will discover which pairs of matrices can be multiplied."
                cards={[
                    {
                        id: "size-matcher",
                        title: "A size matcher where the two inner numbers must lock together",
                        looks: "Two size labels such as 2 x 3 and 3 x 4 written side by side, with the two inner numbers joined when they agree and a clear break when they do not. The size of the answer is shown from the two outer numbers.",
                        manipulate: "Students set the rows and columns of each matrix and see instantly whether the pair locks and what size the answer is.",
                        reveals: "The inner numbers must be equal, and the outer numbers give the size of the answer.",
                        targetsMisconception: "Students think any two matrices can be multiplied, and get the size of the answer wrong",
                        recommended: true,
                    },
                    {
                        id: "shape-blocks",
                        title: "Two rectangles that only fit together when their touching edges are equal",
                        looks: "Each matrix drawn as a rectangle whose width and height are its columns and rows. The two rectangles slide together and either join cleanly or leave a visible gap.",
                        manipulate: "Students resize either rectangle and watch the joined shape, which shows the answer's size, appear or fail to form.",
                        reveals: "The answer inherits the outer edges of the two rectangles, so its size is rows of the first by columns of the second.",
                        targetsMisconception: "Students get the size of the answer matrix wrong",
                    },
                    {
                        id: "pairing-check",
                        title: "A row and a column lined up so leftover numbers are visible",
                        looks: "One row of the first matrix stacked against one column of the second, with the paired numbers linked and any unpaired numbers left hanging.",
                        manipulate: "Students change how many numbers each holds and see the pairing succeed or break down.",
                        reveals: "Multiplication is impossible exactly when a number is left without a partner.",
                        targetsMisconception: "Students think any two matrices can be multiplied",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-summary" maxWidth="xl">
        <Block id="size-rule-summary" padding="sm">
            <EditableParagraph id="para-size-rule-summary" blockId="size-rule-summary">
                Write the two sizes next to each other before you calculate
                anything. The inner pair decides whether the product exists;
                the outer pair tells you the size of the answer. It is worth
                doing this check every single time.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
