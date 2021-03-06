import { Request, Response } from 'express';

export default {
  async overviewPage(req: Request, res: Response) {
    const user = await req.modelFactory.user.fetchById(
      req.modelFactory,
      req.daoFactory,
      req.logger,
      1
    );

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.render('page/main/overview', {
      layout: 'main',
      pageTitle: 'Overview',

      sidebarData: req.sidebarData,

      displayName: user.displayName,
      race: user.race,
      class: user.class,
      attackTurns: new Intl.NumberFormat('en-GB').format(user.attackTurns),

      population: new Intl.NumberFormat('en-GB').format(user.population),
      armySize: new Intl.NumberFormat('en-GB').format(user.armySize),
      citizens: new Intl.NumberFormat('en-GB').format(user.citizens),
      experience: new Intl.NumberFormat('en-GB').format(user.experience),
      level: new Intl.NumberFormat('en-GB').format(user.level),
      xpToNextLevel: new Intl.NumberFormat('en-GB').format(user.xpToNextLevel),
      fortHealth: {
        current: new Intl.NumberFormat('en-GB').format(user.fortHealth.current),
        max: new Intl.NumberFormat('en-GB').format(user.fortHealth.max),
        percentage: user.fortHealth.percentage,
      },
      gold: new Intl.NumberFormat('en-GB').format(user.gold),
      goldPerTurn: new Intl.NumberFormat('en-GB').format(user.goldPerTurn),
      goldInBank: new Intl.NumberFormat('en-GB').format(user.goldInBank),

      offense: 0,
      defense: 0,
      spyOffense: 0,
      spyDefense: 0,
      attacks: {
        won: 0,
        total: 0,
        percentage: 0,
      },
      defends: {
        won: 0,
        total: 0,
        percentage: 0,
      },
      spyVictories: 0,
      sentryVictories: 0,
    });
    return;
  },
};
