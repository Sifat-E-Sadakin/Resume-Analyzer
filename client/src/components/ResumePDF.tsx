import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import { Heading } from "@/components/pdfx/heading/pdfx-heading";
import { Text } from "@/components/pdfx/text/pdfx-text";
import { Divider } from "@/components/pdfx/divider/pdfx-divider";
import { theme } from "@/lib/pdfx-theme";

const styles = StyleSheet.create({
  page: {
    paddingTop: theme.spacing.page.marginTop,
    paddingRight: theme.spacing.page.marginRight,
    paddingBottom: theme.spacing.page.marginBottom,
    paddingLeft: theme.spacing.page.marginLeft,
    backgroundColor: theme.colors.background,
    fontFamily: theme.typography.body.fontFamily,
    fontSize: theme.typography.body.fontSize,
  },
  section: {
    marginBottom: 4,
  },
});

interface ResumePDFProps {
  content: string;
  targetRole?: string;
}

function parseResumeContent(content: string) {
  const lines = content.split("\n");
  const sections: { heading: string; lines: string[] }[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const raw of lines) {
    const line = raw.trimEnd();

    const hashMatch = line.match(/^#{1,3}\s+(.+)/);
    if (hashMatch) {
      if (current) sections.push(current);
      current = { heading: hashMatch[1].trim(), lines: [] };
      continue;
    }

    const isAllCapsHeading =
      line.length > 2 &&
      line === line.toUpperCase() &&
      /^[A-Z][A-Z &/,\-:]+$/.test(line.trim());

    const isUnderlineHeading =
      lines.indexOf(raw) < lines.length - 1 &&
      /^[-=]{3,}$/.test(lines[lines.indexOf(raw) + 1]?.trim() ?? "");

    if (isAllCapsHeading || isUnderlineHeading) {
      if (current) sections.push(current);
      current = { heading: line.trim(), lines: [] };
      continue;
    }

    if (/^[-=]{3,}$/.test(line.trim())) continue;

    if (current) {
      current.lines.push(line);
    } else {
      current = { heading: "", lines: [line] };
    }
  }
  if (current) sections.push(current);

  return sections;
}

export function ResumePDF({ content, targetRole }: ResumePDFProps) {
  const sections = parseResumeContent(content);

  return (
    <Document
      title={`Resume${targetRole ? ` - ${targetRole}` : ""}`}
      author="Resume Analyzer"
    >
      <Page size="A4" style={styles.page}>
        {sections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            {section.heading ? (
              <>
                {idx === 0 ? (
                  <Heading level={1} align="center" noMargin>
                    {section.heading}
                  </Heading>
                ) : (
                  <>
                    <Divider spacing="none" />
                    <Heading level={3} transform="uppercase" tracking="wide" noMargin>
                      {section.heading}
                    </Heading>
                  </>
                )}
              </>
            ) : null}
            {section.lines.map((line, lineIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              const isBullet = /^[•\-*]\s/.test(trimmed);
              if (isBullet) {
                return (
                  <Text
                    key={lineIdx}
                    style={{ paddingLeft: 10 }}
                    noMargin
                  >
                    {trimmed}
                  </Text>
                );
              }

              const isBoldLine = /^\*\*(.+)\*\*$/.test(trimmed);
              if (isBoldLine) {
                return (
                  <Text key={lineIdx} weight="bold" noMargin>
                    {trimmed.replace(/^\*\*|\*\*$/g, "")}
                  </Text>
                );
              }

              return (
                <Text key={lineIdx} noMargin>
                  {trimmed}
                </Text>
              );
            })}
          </View>
        ))}
      </Page>
    </Document>
  );
}
