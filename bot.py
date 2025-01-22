import asyncio
import os

from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo
from aiohttp import web

# Replace with your bot token
BOT_TOKEN = os.getenv("BOT_TOKEN")

# Initialize bot and dispatcher
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

# Create a web application
app = web.Application()
routes = web.RouteTableDef()


@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    await message.answer(
        "Welcome to Snake Game!",
        reply_markup=types.InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    types.InlineKeyboardButton(
                        text="Play Snake",
                        web_app=WebAppInfo(
                            url="https://davronbekdev.github.io/snake-game"
                        ),
                    )
                ]
            ]
        ),
    )


@routes.get("/")
async def handle_root(request):
    return web.FileResponse("index.html")


@routes.get("/game.js")
async def handle_game_js(request):
    return web.FileResponse("game.js")


# Add routes to the web app
app.add_routes(routes)


# Serve static files
async def on_startup(app):
    print("Bot started!")


app.on_startup.append(on_startup)


async def main():
    # Start web application
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", 8080)
    await site.start()

    # Start bot polling
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
