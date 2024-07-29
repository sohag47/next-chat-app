import { TBibliographyTabs, TTag } from "@/app/library/types/bibliography/bibliography.type";

export const BibliographyTags: TTag[] = [
  {
    id: 1,
    tag_no: "1",
    text_for_lib: "Accession Number",
    text_for_opac: "Accession Number",
    tagfor: "accession_number",
    config: null,
    subfields: [
      {
        id: 1,
        subfield_code: "a",
        text_for_lib: "Accession Number",
        text_for_opac: "Accession Number",
        config: null,
      },
      {
        id: 2,
        subfield_code: "b",
        text_for_lib: "Call Number",
        text_for_opac: "Call Number",
        config: null,
      },
    ],
  },
  {
    id: 2,
    tag_no: "2",
    text_for_lib: "Title",
    text_for_opac: "Title",
    tagfor: "title",
    config: null,
    subfields: [
      {
        id: 1,
        subfield_code: "a",
        text_for_lib: "Title",
        text_for_opac: "Title",
        config: null,
      },
      {
        id: 2,
        subfield_code: "b",
        text_for_lib: "Subtitle",
        text_for_opac: "Subtitle",
        config: null,
      },
    ],
  },
  {
    id: 3,
    tag_no: "3",
    text_for_lib: "Author",
    text_for_opac: "Author",
    tagfor: "author",
    config: null,
    subfields: [
      {
        id: 1,
        subfield_code: "a",
        text_for_lib: "Author",
        text_for_opac: "Author",
        config: null,
      },
      {
        id: 2,
        subfield_code: "b",
        text_for_lib: "Contributor",
        text_for_opac: "Contributor",
        config: null,
      },
    ],
  },
]