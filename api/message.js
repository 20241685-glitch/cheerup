// Vercel 서버리스 함수: GET /api/message?name=닉네임
// 응원 문장 15개 중 하나를 골라 이름과 함께 돌려준다.

const MESSAGES = [
  "{name}, 오늘 하루도 정말 잘 해내고 있어요!",
  "{name}의 작은 한 걸음이 큰 변화를 만들어요.",
  "{name}, 지금 이대로도 충분히 멋져요.",
  "조금 느려도 괜찮아요. {name}만의 속도로 가면 돼요.",
  "{name}, 오늘의 노력은 내일의 자신감이 될 거예요.",
  "{name}, 힘든 순간도 결국 지나가요. 생각보다 강하니까요.",
  "{name}, 스스로를 칭찬해 줄 시간이에요. 수고했어요!",
  "{name}의 웃음이 누군가에게 힘이 되고 있어요.",
  "{name}, 실수해도 괜찮아요. 계속 배우고 있으니까요.",
  "{name}, 오늘도 포기하지 않은 당신을 응원해요.",
  "{name}에게 좋은 일이 가득한 하루가 되길 바라요.",
  "{name}, 깊게 숨 한 번 쉬고, 다시 시작해 봐요.",
  "{name}, 지금까지 해 온 모든 것들은 헛되지 않았어요.",
  "{name}, 당신은 생각보다 훨씬 많은 걸 해내고 있어요.",
  "{name}, 오늘의 주인공은 바로 당신이에요. 파이팅!",
];

const MAX_NAME_LENGTH = 20;

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "GET 요청만 지원해요." });
  }

  const raw = typeof req.query.name === "string" ? req.query.name : "";
  const name = raw.trim().slice(0, MAX_NAME_LENGTH) || "여러분";

  const template = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const message = template.split("{name}").join(name);

  return res.status(200).json({ name, message });
};
