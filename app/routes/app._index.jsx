import { useCallback, useEffect, useState } from "react";
import { json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  ClipboardIcon,
  CodeIcon,
  EditIcon,
  DeleteIcon,
  NoteIcon,
} from "@shopify/polaris-icons";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  InlineStack,
  LegacyCard,
  DataTable,
  Frame,
  Modal,
  DropZone,
  LegacyStack,
  Thumbnail,
  TextField,
  Popover,
  ActionList,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";
import Loader from "../components/Loader/Loader";

const prisma = new PrismaClient();

export const loader = async ({ request }) => {

  const { admin } = await authenticate.admin(request);
  const audio = await prisma.audio.findMany({
    where: {
      shop: admin?.rest?.session?.shop,
    },
    select: {
      id: true,
      title: true,
      url: true,
      shop: true,
    },
  });

  const user = await prisma.Users.findMany({
    where: { shop: admin?.rest?.session?.shop },
  });

  console.log(audio);

  return json({ audio, user: user[0] });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const body = await request.formData();

  const data = body.get("data");

  const screens = await prisma.screen.findMany({});

  console.log({ screens });

  const response = await admin.graphql(
    `#graphql
  mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        id
        alt
        createdAt
      }
    }
  }`,
    {
      variables: {
        files: {
          alt: "fallback text for an File",
          contentType: "FILE",
          originalSource: data.split(",")[0],
        },
      },
    },
  );
  const responseJson = await response.json();

  console.log({ responseJson });
  if (!admin.rest.session.shop) {
    new Error("Shop not found");
  }
  let createAudio;
  if (request.method === "POST") {
    console.log({ responseJson });
    console.log({ responseJson });

    const getUrlPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const responseAudioUrl = await admin.graphql(
          `#graphql
    query {
    node(id: "${responseJson?.data?.fileCreate?.files[0]?.id}") {
        ... on GenericFile {
            id
            url
        }
    }
}
    `,
        );
        const responseAudioUrlJson = await responseAudioUrl.json();
        resolve({ responseAudioUrlJson });
      }, [1000]);
    });

    const screen = {};

    const { responseAudioUrlJson } = await getUrlPromise;
    createAudio = await prisma.audio.create({
      data: {
        shop: admin?.rest?.session?.shop,
        title: data.split(",")[1],
        url: responseAudioUrlJson.data.node.url,
        screenOne: screens[0],
        screenTwo: screens[1],
        screenDefault: screens[2],
        selectedScreen: screens[0]?.title,
      },
    });
    return json({ responseJson, responseAudioUrlJson, createAudio });
  } else if (request.method === "DELETE") {
    const result = await prisma.audio.delete({
      where: { id: body.get("data") },
    });
    return json({ result });
  }
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const loaderData = useLoaderData();
  const submit = useSubmit();
  const isLoading =
    (["loading", "submitting"].includes(nav.state) &&
      nav.formMethod === "POST") ||
    nav.formMethod === "PUT" ||
    nav.formMethod === "DELETE";
  const [active, setActive] = useState(false);
  const handleModalChange = useCallback(() => setActive(!active), [active]);
  const handleClose = () => {
    handleModalChange();
  };

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = useCallback((newValue) => setTitle(newValue), []);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .mp3, .mp4" />
  );
  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{" "}
            <Text variant="bodySm" as="p">
              {bytesToSize(file.size)}
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  const uploadAudio = useCallback(() => {
    handleModalChange();
  });
  const handleSubmitAudioFile = useCallback(() => {
    const formData = new FormData();

    formData.append("async-upload", files[0]);
    const url = `https://files.bplugins.com/wp-json/media-upload/v1/image-upload`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData?.success) {
          submit({ data: [imageData.data.url, title] }, { method: "POST" });
          setFiles([]);
          setTitle("");
          setLoading(true);
        }
      });
    handleModalChange();
  });

  const [activeToasts, setActiveToasts] = useState([]);
  const toggleActive = (id) =>
    setActiveToasts((activeToasts) => {
      const isToastActive = activeToasts.includes(id);
      return isToastActive
        ? activeToasts.filter((activeToast) => activeToast !== id)
        : [...activeToasts, id];
    });

  const toggleActiveOne = useCallback(() => toggleActive(1), []);

  const toggleActiveTwo = useCallback(() => toggleActive(2), []);

  const [popoverActive, setPopoverActive] = useState(0);

  const togglePopoverActive = useCallback((id) => setPopoverActive(id), []);

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    toggleActiveOne();
  };
  const copyEmbed = (id, title) => {
    const embedCode = `<button class="star-audio-player" data-id="${id}">${title}</button>`;

    navigator.clipboard.writeText(embedCode);
    toggleActiveTwo();
  };

  const rows = [];

  loaderData?.audio?.map((audio) =>
    rows.push([
      audio?.id,
      audio?.title,
      <div style={{ display: "inline-flex", gap: "10px" }}>
        {/*
         */}
        <Link to={`/app/shohan/${audio.id}`}>
          <Button variant="primary" icon={EditIcon} tone="success">
            Edit
          </Button>
        </Link>
        {/* <Button variant="primary" icon={EditIcon} onClick={() => edit(item)}>
          Edit
        </Button> */}
        {/* <div style={{ height: "40px" }}> */}
        <Popover
          active={popoverActive == audio.id}
          activator={
            <Button onClick={() => togglePopoverActive(audio.id)} disclosure>
              More actions
            </Button>
          }
          autofocusTarget="first-node"
          onClose={togglePopoverActive}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: (
                  <Button
                    variant="primary"
                    icon={ClipboardIcon}
                    onClick={() => copyId(audio.id)}
                  >
                    Copy ID
                  </Button>
                ),
              },
              {
                content: (
                  <Button
                    variant="primary"
                    icon={CodeIcon}
                    onClick={() => copyEmbed(audio.id, audio.title)}
                  >
                    Embed Code
                  </Button>
                ),
              },
            ]}
          />
        </Popover>
        {/* </div> */}
        <Button
          variant="primary"
          tone="critical"
          icon={DeleteIcon}
          onClick={() => submit({ data: audio.id }, { method: "DELETE" })}
        >
          Delete
        </Button>
      </div>,
    ]),
  );

  // useEffect(() => {
  //   if (isLoading) {
  //     setFiles([]);
  //     setTitle("");
  //   }
  // }, [isLoading]);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <Page>
      <ui-title-bar title="Star Audio Player">
        <button variant="primary" onClick={uploadAudio}>
          Upload Audio
        </button>
      </ui-title-bar>
      <LegacyCard>
        <DataTable
          columnContentTypes={["text", "text", "numeric"]}
          headings={["id", "Title", "Actions"]}
          rows={rows}
        />
      </LegacyCard>
      <Frame>
        <Modal
          open={active}
          onClose={handleClose}
          title="Upload Audio File"
          primaryAction={{
            content: "Submit",
            onAction: handleSubmitAudioFile,
            loading: isLoading,
            disabled: !title && files,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleClose,
            },
          ]}
        >
          <Modal.Section>
            {loaderData?.audio?.length == loaderData?.user?.cardits ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    color: "red",
                    marginBottom: "10px",
                  }}
                >
                  Your Maximum Limit {loaderData?.user?.cardits}
                </h2>
                <Button variant="primary">Upgrade</Button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                    autoComplete="off"
                  />
                </div>
                <DropZone onDrop={handleDropZoneDrop} variableHeight>
                  {uploadedFiles}
                  {fileUpload}
                </DropZone>
              </>
            )}
          </Modal.Section>
        </Modal>
      </Frame>
    </Page>
  );
}
